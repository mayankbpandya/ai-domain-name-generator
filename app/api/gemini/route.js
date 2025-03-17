import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI('AIzaSyBty4hDKlBOS4XIBtwfroGo5FMp-MuRcSo');

export async function POST(request) {
  try {
    const body = await request.json();
    const { keywords, length, contain, count } = body;

    // Validate required fields
    if (!keywords) {
      return Response.json({ error: 'Keywords are required' }, { status: 400 });
    }

    // Configure the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Create the prompt for Gemini
    const prompt = `Generate ${count} unique and creative domain names based on the following criteria:
    - Keywords/Description: ${keywords}
    - Length: Between ${length.min} and ${length.max} characters
    ${contain ? `- Must contain: ${contain}` : ''}
    
    Provide domain names without TLDs (.com, .net, etc). Return ONLY domain names, one per line.
    Make sure each domain name is:
    1. Memorable and easy to spell
    2. Related to the keywords provided
    3. Within specified length constraints
    4. Contains the required text (if specified)
    5. Unique and creative
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Process the response to extract domain names
    const domains = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('-') && !line.match(/^\d+\./))
      .map(domain => {
        // Remove any TLD if present
        return domain.replace(/\.[a-z]+$/, '');
      })
      .filter(domain => {
        // Validate each domain against the criteria
        return (
          domain.length >= length.min &&
          domain.length <= length.max &&
          (!contain || domain.toLowerCase().includes(contain.toLowerCase()))
        );
      })
      .slice(0, count);

    return Response.json({ domains });
  } catch (error) {
    console.error('Error generating domain names:', error);
    return Response.json({ error: 'Failed to generate domain names' }, { status: 500 });
  }
}