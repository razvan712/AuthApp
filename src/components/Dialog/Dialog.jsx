/* eslint-disable react/prop-types */
import {
  ErrorText,
  ModelText,
  OpenDialogButton,
  StyledDialog,
} from "./DialogStyles";

const Dialog = ({
  isOpen,
  onClose,
  text,
  buttonAction,
  btnText,
  errorMessages = [],
}) => {
  return (
    <StyledDialog open={isOpen}>
      {errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <ErrorText key={index}>
            {error.field} {error.message}
          </ErrorText>
        ))}
      {errorMessages.length == 0 && <ModelText>{text}</ModelText>}
      <OpenDialogButton onClick={onClose}>Close</OpenDialogButton>
      {errorMessages.length == 0 && (
        <OpenDialogButton onClick={buttonAction}>{btnText}</OpenDialogButton>
      )}
    </StyledDialog>
  );
};

export default Dialog;
