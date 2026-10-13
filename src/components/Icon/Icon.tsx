import logoIcon from "../../assets/icons/logo.svg";
import plusIcon from "../../assets/icons/+.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import saveIcon from "../../assets/icons/save.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import doneIcon from "../../assets/icons/done.svg";

const icons = {
  logo: logoIcon,
  plus: plusIcon,
  edit: editIcon,
  delete: deleteIcon,
  save: saveIcon,
  cancel: cancelIcon,
  done: doneIcon,
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <img
      src={icons[name]}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
}
