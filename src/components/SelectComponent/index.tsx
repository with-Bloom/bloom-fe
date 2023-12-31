import Input from 'components/Input';
import ImageCardButton from 'components/Button/ImageCardButton';
import ImageButton from 'components/Button/ImageButton';
import PrimaryButton from 'components/Button/PrimaryButton';
import Textarea from 'components/Textarea';

type imageButtonProps = {
  target: string;
  color: string;
};

type Props = {
  type: string;
  options: string | string[] | imageButtonProps[];
  onClick: any;
  onChange?: React.ChangeEventHandler<HTMLElement> | undefined;
  count?: number;
};

const SelectComponent: React.FC<Props> = ({ type, options, onClick, onChange, count }: Props) => {
  switch (type) {
    case 'input':
      return <Input placeholder={options as string} onChange={onChange} />;
    case 'image-card-button':
      return <ImageCardButton options={options as imageButtonProps[]} onClick={onClick} />;
    case 'image-button':
      return <ImageButton options={options as imageButtonProps[]} onClick={onClick} />;
    case 'primary-button':
      return <PrimaryButton options={options as string[]} onClick={onClick} />;
    case 'textarea':
      return <Textarea placeholder={options as string} onChange={onChange} count={count || 0} />;
    default:
      return null;
  }
};

export default SelectComponent;
