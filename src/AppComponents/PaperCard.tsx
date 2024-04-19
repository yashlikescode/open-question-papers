import React from "react";
import { Link } from "react-router-dom";
interface Item {
  College: string;
  ExamMonth: string;
  ExamYear: string;
  Professor: string;
  QuestionPaper: string;
  Subject: string;
  Timestamp: string;
}

interface PaperCardProps {
  fcData: Item[];
}
const PaperCard: React.FC<PaperCardProps> = ({ fcData }) => {
  const RemoveQuotes = (obj: string) => {
    if (obj[0] === '"') {
      let objArr = obj.split("");
      objArr.pop();
      objArr.shift();
      return objArr.join("");
    } else return obj;
  };
  return (
    <div className="paper-card-parent">
      {fcData.map((item) => (
        <div
          className="card card1 m-4"
          style={{ width: "23rem" }}
          key={item["Timestamp"]}
        >
          <div className="card-body">
            <h5 className="card-title text-primary fw-bold">
              {RemoveQuotes(item["Subject"])}
            </h5>
            <h5 className="card-title m-3">
              {RemoveQuotes(item["College"])}
            </h5>
            <h6 className="card-subtitle mb-2 text-primary">
              🧑‍🏫 {RemoveQuotes(item["Professor"])}
            </h6>
            <p className="card-text text-body-secondary">
              Uploaded: {RemoveQuotes(item["ExamMonth"])},
              {RemoveQuotes(item["ExamYear"])}
            </p>
            <Link
              className="cardlink"
              to={item["QuestionPaper"]}
              target="_blank"
            >
              Link
              <svg
                className="linksvg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 520 520"
              >
                <path
                  fill="#2474ff"
                  d="M320 24c0 4.4 3.6 8 8 8H468.7L202.3 298.3c-3.1 3.1-3.1 8.2 0 11.3s8.2 3.1 11.3 0L480 43.3V184c0 4.4 3.6 8 8 8s8-3.6 8-8V24c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8zM56 32C25.1 32 0 57.1 0 88V456c0 30.9 25.1 56 56 56H424c30.9 0 56-25.1 56-56V312c0-4.4-3.6-8-8-8s-8 3.6-8 8V456c0 22.1-17.9 40-40 40H56c-22.1 0-40-17.9-40-40V88c0-22.1 17.9-40 40-40H200c4.4 0 8-3.6 8-8s-3.6-8-8-8H56z"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaperCard;