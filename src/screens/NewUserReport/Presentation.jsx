import React from "react";

const Presentation = (props) => {

  const { behavioral_presentation_and_grooming } = props;

  // Function to calculate the overall score
  const calculateScore = (scores) => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length;

    const roundedScore = Math.round(averageScore);
    return roundedScore;

  };

  // Extract scores from the secured_marks key
  const presentationScores = behavioral_presentation_and_grooming.data.map(item => item.secured_marks);

  // Calculate the overall score based on the scores
  const overallPresentationScore = calculateScore(presentationScores);

  const getScoreColor = (x) => {
    if (x >= 0 && x <= 4) {
      return 'text-red'; // Apply red color
    } else if (x >= 5 && x <= 7) {
      return 'text-orange'; // Apply yellow color
    } else if (x >= 8 && x <= 10) {
      return 'text-green'; // Apply green color
    } else {
      return 'text-gray'; // Default color or handle other cases
    }
};

  return (
    
    <>
      <div className="mx-6 my-6">
        <div className="flex justify-around items-center pb-4 lg:pb-8 munsow-dark-bg">
          <h1 className="mx-4 text-2xl lg:text-4xl font-semibold text-white">Presentation and Grooming</h1>
          <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`text-3xl lg:text-4xl font-bold ${getScoreColor(overallPresentationScore)}`}>{overallPresentationScore}/10</h1>
            <p className="text-lg font-semibold text-purple">Overall Score</p>
          </div>
        </div>

        <div className="p-4 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">

          {behavioral_presentation_and_grooming.data.map((value, index) => (
            <div className="">
              <h1 className={`text-center text-4xl font-bold ${getScoreColor(value.secured_marks)}`}>{value.secured_marks}/10</h1>
              <h3 className="text-center text-lg font-semibold text-purple">{value.title}</h3>
              <p className="text-purple text-center">{value.notes}</p>
            </div>
          ))}

        </div>
      

      </div>
    </>
  );
};

export default Presentation;
