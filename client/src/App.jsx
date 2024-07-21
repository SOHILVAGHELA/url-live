import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleshortenUrl = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6060/api/url/shorten",
        { originalUrl: url }
      );
      setShortUrl(response.data.shortId);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <>
      <div className="container url-container">
        <form onSubmit={handleshortenUrl}>
          <div className="mb-3">
            <label htmlFor="urlInput" className="form-label">
              Transform Long URLs into Short URLs
            </label>
            <input
              type="text"
              className="form-control"
              id="urlInput"
              value={url}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary form-control">
            Shorten URL
          </button>
          {shortUrl && (
            <div className="short-url mt-3">
              <p>Your short URL:</p>
              <a
                href={`http://localhost:6060/api/url/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default App;
