import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionList } from 'src/data/questionList';
import Layout from 'layout/index';
import QuestionTitle from 'components/QuestionTitle';
import Header from 'components/Header';
import SelectComponent from 'components/SelectComponent';
import ProgressBar from 'components/ProgressBar';
import NextButton from 'components/Button/NextButton';
import Loading from 'pages/Loading';

type answerListType = {
  targetType: string;
  targetName: string;
  relationship: string;
  userName: string;
  concept: string;
  story: string;
  speechType: string;
  lastComment: string;
  minute: number;
};

const QuestionPage = () => {
  const LAST_PAGE = 9;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputCount, setInputCount] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answerList, setAnswerList] = useState<answerListType>({
    userName: '',
    targetName: '',
    targetType: '',
    relationship: '',
    minute: 0,
    speechType: '',
    concept: '',
    story: '',
    lastComment: '',
  });

  const answerListKeysOrder = [
    'userName',
    'targetName',
    'targetType',
    'relationship',
    'minute',
    'speechType',
    'concept',
    'story',
    'lastComment',
  ];

  useEffect(() => {}, [answerList]);

  const handleClick = async (value: any) => {
    const currentType = questionList[currentPage - 1].type;
    const currentKey = answerListKeysOrder[currentPage - 1];

    setAnswerList((prevAnswerList) => {
      const updatedAnswerList = {
        ...prevAnswerList,
        [currentKey]: currentType === 'input' || currentType === 'textarea' ? input : value,
      };
      return updatedAnswerList;
    });

    if (currentPage === LAST_PAGE) {
      setIsLoading(true);

      setTimeout(() => {
        navigate('/result', { state: { answerList } });
      }, 5000);
    } else {
      setCurrentPage((state) => state + 1);
      setInputCount(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    setInput(e.target.value);
  };

  return (
    <>
      <Layout>
        {isLoading && <Loading />}
        <div className="flex h-full flex-col justify-between px-6 pb-10">
          <div>
            <Header />
            <ProgressBar currentPage={currentPage} />
          </div>
          {questionList.map((el) => {
            return (
              currentPage === el.page && (
                <div className="flex h-[calc(100vh-84px)] flex-col justify-between">
                  <div key={el.page}>
                    <QuestionTitle>{el.question}</QuestionTitle>
                    {SelectComponent({
                      type: el.type,
                      options: el.options,
                      onClick: handleClick,
                      onChange: handleInputChange,
                      count: inputCount,
                    })}
                  </div>
                  {(el.type === 'input' || el.type === 'textarea') && (
                    <NextButton onClick={handleClick} disabled={inputCount === 0}>
                      {el.page === LAST_PAGE ? '내 축사 확인하기' : '다음'}
                    </NextButton>
                  )}
                </div>
              )
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default QuestionPage;
