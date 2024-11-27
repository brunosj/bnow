import { BsQuestionCircleFill } from 'react-icons/bs';

interface InfoButtonProps {
  onClick: () => void;
  isLeftPanelOpen: boolean;
}

const InfoButton = ({ onClick, isLeftPanelOpen }: InfoButtonProps) => {
  return (
    <div
      className={`absolute info-button z-10 transition-all duration-300 ${
        isLeftPanelOpen ? 'left-[21%]' : 'left-4'
      }`}
    >
      <button
        onClick={onClick}
        className='hidden lg:flex items-center gap-2 bg-black bg-opacity-100 hover:bg-opacity-85 text-white px-4 py-2 rounded-full transition-all duration-300'
      >
        <BsQuestionCircleFill size={20} />
        <span className='text-sm whitespace-nowrap'>
          How to add your soundbite
        </span>
      </button>
    </div>
  );
};

export default InfoButton;
