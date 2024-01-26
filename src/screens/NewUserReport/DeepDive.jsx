
import { AiOutlineLike } from "react-icons/ai";
import { FaRegThumbsDown } from "react-icons/fa";


const DeepDive = (props) => {

  const { head, ques, candidateAns, sampleAns, gotRight, gotWrong, feedback } = props;

  const feedbackData = feedback;

  // Parse the feedbackData string into an object
  const feedbackObject = JSON.parse(feedbackData);

  const getBackgroundColor = (head) => {
    const firstWord = head.split(' ')[0];
  
    if (firstWord === 'Behavioural') {
      return 'bg-purple'; // Apply purple color
    } else if (firstWord === 'Practical') {
      return 'bg-orange'; // Apply orange color
    } else if (head.startsWith('Domain Knowledge')) {
      return 'bg-green'; // Apply green color
    } else {
      return 'bg-gray'; // Default color or handle other cases
    }
  };

  const bgColor = getBackgroundColor(head);

  return (

    <>
    <div className="mx-3 my-3 md:mx-6 md:my-6">
      <div className={`mb-8 ${bgColor}`}>
        <h1 className={`text-2xl lg:text-4xl font-semibold text-purple p-6 md:p-8`}>{head} Deep Dive</h1>
      </div>
      <div className={`mb-8 ${bgColor}`}>
        <h1 className="text-lg lg:text-xl font-semibold text-purple p-5">{ques}</h1>
      </div>
      <div className="p-4 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div className="">
          <h3 className="text-lg font-semibold italic text-purple mb-4">Candidate's Answer:</h3>
          <p className="text-purple">{candidateAns}</p>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold italic text-purple mb-4">Sample Answer for reference</h3>
          <p className="text-purple">{sampleAns}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Insights</h3>
        </div>
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div className="">
          <h3 className="text-sm font-semibold italic text-darkgreen bg-lightgreen p-1 inline-flex mb-4"><AiOutlineLike color="green" className="m-0.5" />What you got right</h3>
          <p className="bg-lightgreen text-purple rounded-3xl p-4">{gotRight}</p>
        </div>
        <div className="">
          <h3 className="text-sm font-semibold italic text-darkred bg-lightred p-1 inline-flex mb-4"><FaRegThumbsDown color="brown" className="m-1" />What you got wrong</h3>
          <p className="bg-lightred text-purple rounded-3xl p-4">{gotWrong}</p>
        </div>
        </div>
      </div>

      <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold italic text-purple">Feedback for the Candidate:</h3>
      </div>
      <ol className="pl-4 text-purple">
        {Object.keys(feedbackObject).map((key) => (
          <li className="mb-1" key={key}>
            {key.includes('.') ? key.split('.')[1] : key}.{feedbackObject[key]}
          </li>
        ))}
      </ol>
      </div>


    </div>
    </>
  );
};

export default DeepDive;
