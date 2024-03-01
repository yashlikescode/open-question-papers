import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

interface Item {
  College: string;
  ExamMonth: string;
  ExamYear: string;
  Professor: string;
  QuestionPaper: string;
  Subject: string;
  Timestamp: string;
}

function App() {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHo3R_blkcXb8Vo40Ml9yZPKbo1S57F2iWD6zkwLUGrAWDEommpE_T5G9QriSu-u3F6ahfCojSovCJ/pub?output=csv";

  const [displayData, setDisplayData] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>("");
  const RemoveQuotes = (obj: string) => {
    if (obj[0] === '"') {
      let objArr = obj.split("");
      objArr.pop();
      objArr.shift();
      return objArr.join("");
    } else return obj;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();

        // Split CSV lines
        const lines = csvData.split("\n");

        // Get headers from the first line

        // Parse CSV data into JSON
        const jsonData = lines.slice(1).map((line): Item => {
          var indi = 0;
          for (let i = 0; i < line.length; i++) {
            if (line[i] === '"' && indi === 0) indi = 1;
            else if (line[i] === '"' && indi === 1) indi = 0;
            if (indi === 0 && line[i] === ",") {
              let a = line;
              let a2 = a.split("");
              a2[i] = "^";
              let a3 = a2.join("");
              line = a3;
            }
          }
          console.log(line);
          const values = line.split("^");
          return {
            College: values[2].trim(),
            ExamMonth: values[6].trim(),
            ExamYear: values[5].trim(),
            Professor: values[3].trim(),
            QuestionPaper: values[4].trim(),
            Subject: values[1].trim(),
            Timestamp: values[0].trim(),
          };
        });

        setDisplayData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching or parsing CSV");
      }
    };

    fetchData();
  }, []);

  const filteredData = displayData.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="App">
      <h1>Open Question Papers</h1>
      <div className="upload">
        <Link to={"https://forms.gle/bhx1rYpbj6GPzZMQA"} target="_blank">
          <button>Upload Your Papers</button>
        </Link>
        <br />
        <label className="email-instr">
          (Your email would not be recorded, but you do need a gmail account.)
        </label>
      </div>
      <form className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Start Typing to Search"
        />
        &#128269;
      </form>

      <table>
        <tr>
          <th>Uploaded</th>
          <th>College</th>
          <th>Subject</th>
          <th>Year</th>
          <th>Month</th>
          <th>Professor</th>
          <th>Link</th>
        </tr>
        {filteredData.map((item) => (
          <tr className="flex-container" key={item["Timestamp"]}>
            <td>{RemoveQuotes(item["Timestamp"])}</td>
            <td>{RemoveQuotes(item["College"])}</td>
            <td>{RemoveQuotes(item["Subject"])}</td>
            <td>{RemoveQuotes(item["ExamYear"])}</td>
            <td>{RemoveQuotes(item["ExamMonth"])}</td>
            <td>{RemoveQuotes(item["Professor"])}</td>
            <td>
              <Link to={item["QuestionPaper"]} target="_blank">
                Link
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
