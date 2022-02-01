
import { radiosShared } from 'const';
import { setRadioShared, setTypingPopup, useGlobalContext } from 'hook';
import { IGlobalState } from 'model/globalState.model';
import './popup-shared.scss';

function PopupShared() {
  const [ globalState, dispatch] = useGlobalContext() as [IGlobalState, any];

  function handleTypingPopup() {
    dispatch(setTypingPopup(true))
  }

  function handleRadioChange(event: HTMLInputElement | any) {
    dispatch(setRadioShared(event.target.value))
  }
  
  return (
    <div className="popup-shared">
      <div className="popup-header">
        <span className="header-back" onClick={handleTypingPopup}>Back</span>
        <span className="header-title">Chọn đối tượng</span>
      </div>
      <div className="popup-content">
        <div className="popup-question">
          <div className="question-title">Ai có thể xem bài viết của bạn?</div>
          <p className="question-content">Bài viết của bạn sẽ xuất hiện Bảng tin và trang cá nhân.</p>
        </div>
        <div className="popup-choose">
          {
            radiosShared.map(radio => {
              return (
                <label key={ radio.id } className="choose-item" htmlFor={ radio.id }>
                  <span className="item-icon"></span>
                  <div className="item-content">
                    { radio.title && <span className="item-title">{ radio.title }</span> }
                    { radio.text && <span className="item-text">{ radio.text } </span> }
                  </div>
                  <input
                    id={ radio.id } 
                    type="radio" 
                    name="shared" 
                    value={ radio.value } 
                    className="item-radio" 
                    defaultChecked={ globalState.shared === radio.value }
                    onChange={ handleRadioChange }
                  />
                </label>
            )})
          }
        </div>
      </div>
    </div>
  );
}

export default PopupShared;
