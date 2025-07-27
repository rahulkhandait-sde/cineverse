# OMDB API Setup Instructions

## Getting Your OMDB API Key

1. **Visit the OMDB API website**: Go to [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)

2. **Choose a plan**:
   - **FREE (1,000 daily requests)**: Select "FREE (1,000 daily requests)" and click "Submit"
   - **Paid plans**: Available for higher usage limits

3. **Fill out the form**:
   - Enter your email address
   - Complete the required information
   - Click "Submit"

4. **Check your email**:
   - Check your email inbox for the API key
   - The email will contain your unique API key

5. **Update your environment file**:
   - Copy your API key
   - Replace the key in `.env.local`:
   ```
   NEXT_PUBLIC_OMDB_API_KEY=YOUR_API_KEY_HERE
   ```

6. **Restart the development server**:
   ```bash
   npm run dev
   ```

## Current API Key Status
The current API key in this project (`b9bd48a6`) is a demo key that should work for testing purposes.

## Troubleshooting

### "Invalid API key!" Error
- Make sure your API key is correct
- Check that the `.env.local` file is in the root directory
- Restart the development server after changing the API key

### "Too many results" Error
- Be more specific with your search terms
- Use year or genre filters to narrow down results

### No Results Found
- Check your internet connection
- Try different search terms
- Verify the API key is working with a simple test

## Testing Your API Key

You can test your API key manually by visiting this URL in your browser:
```
https://www.omdbapi.com/?s=batman&apikey=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual API key. You should see JSON data with movie results.
