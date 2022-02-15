
import NavBar from 'navbar/nav-bar';
import { VscSearch } from "react-icons/vsc";

import './messengers.scss';

function Messengers() {
  return (
    <>
      <NavBar />
      <div className="app-messengers">
        <div className="messenger-friends">
          <div className="friends-title">
            Chat
          </div>
          <div className="friends-container">
            <label htmlFor="search-input" className="friends-search">
              <span className="search-icon"><VscSearch /></span>
              <input id="search-input" className="search-typing" type="text" placeholder="Tìm kiếm trên messenger" />
            </label>
            <div className="friends-list">
              <div className="friends-item active">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
              <div className="friends-item ">
                <span className="item-icon">
                  <img src="" alt="" />
                </span>
                <div className="item-info">
                  <span className="info-name">Đinh Thị Chang</span>
                  <span className="info-message">You: message...</span>
                </div>
                <div className="item-seen"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="messenger-message">

        </div>
      </div>
    </>
  );
}

export default Messengers;
