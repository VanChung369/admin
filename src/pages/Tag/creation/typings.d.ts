export type CreateOrUpdateProps = {
  tagId?: string;
};

type TagProps = {
  visible: boolean;
  onClose?: () => void;
  setVisible: any;
  tagId?: string;
};
