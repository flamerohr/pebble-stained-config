import {
  useEffect,
  useState,
  type FC,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import Button from "#components/button/button";

import s from "./modal.module.scss";
import Icon from "#components/icon/icon";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  onHide: () => void;
  renderContent?: () => ReactNode;
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

const noop = () => null;

export const Modal: FC<ModalProps> = ({
  show,
  onHide,
  className,
  renderContent = noop,
  renderHeader,
  renderFooter,
  ...props
}) => {
  const [targetNode, setTargetNode] = useState<HTMLDivElement>();

  useEffect(() => {
    const node = document.createElement("div");
    node.classList.add(s.modalcontainer, s.containerhide);

    setTargetNode(node);

    document.body.appendChild(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  useEffect(() => {
    if (!targetNode) {
      return;
    }

    if (show) {
      targetNode.classList.remove(s.containerhide);
    } else {
      targetNode.classList.add(s.containerhide);
    }
  }, [show]);

  if (!targetNode) {
    return null;
  }
  return createPortal(
    <>
      <div className={s.background} onClick={onHide} />
      <div {...props} className={classNames(className, s.box)}>
        <div className={s.header}>
          <div className={s.headertitle}>{renderHeader && renderHeader()}</div>
          <Button onClick={onHide}>
            <Icon name="cross" size="0.7rem" />
          </Button>
        </div>
        <div className={s.content}>{renderContent()}</div>
        {renderFooter && <div className={s.footer}>{renderFooter()}</div>}
      </div>
    </>,
    targetNode,
  );
};

export default Modal;
