import React from 'react';

interface Props {
  children: React.ReactNode,
  cancelHandler: () => void
};

export default function Modal(props: Props) {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.cancelHandler}></button>
    </div>
  );
}
