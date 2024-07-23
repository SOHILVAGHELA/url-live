import { useState } from "react";
import { IoLinkOutline, IoQrCodeOutline } from "react-icons/io5";
import { GoUnlink, GoCopy } from "react-icons/go";
import { FaShare } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortid, setShortid] = useState("");
  const [isQRmodalOpen, setQRModal] = useState(false);
  const toggleQRModal = () => setQRModal(!isQRmodalOpen);
  const [isShareModalOpen, setShareModal] = useState(false);
  const toggleShareModal = () => setShareModal(!isShareModalOpen);
  const [isCopied, setCopied] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleshortenUrl = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://url-live.onrender.com/shorten`,
        { originalUrl: url }
      );
      setShortid(response.data.shortId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error shortening URL:", error);
    }
  };

  const handleQr = () => {
    toggleQRModal();
  };

  const shareUrl = `https://url-live.onrender.com/${shortid}`;

  return (
    <>
      <div className="container">
        <div className="url-container">
          <div className="card card-body p-4">
            <h1 className="mb-3 fw-bold">URL Shortify</h1>
            <form onSubmit={handleshortenUrl}>
              {!shortid && (
                <>
                  <div className="mb-3">
                    <div className="d-flex icons mb-2">
                      <IoLinkOutline size={25} />
                      <p className="m-1">Shorten a long URL</p>
                    </div>
                    <input
                      value={url}
                      required
                      placeholder="Enter long link here"
                      type="text"
                      className="form-control form-control-lg py-2 px-6"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="form-control btn btn-lg btn-dark fw-semibold px-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="spinner-border" role="status"></div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </>
              )}
              {shortid && (
                <>
                  <div className="mb-3">
                    <div className="d-flex icons mb-2">
                      <svg
                        data-v-da533260=""
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="20"
                        height="18"
                      >
                        <path
                          data-v-da533260=""
                          d="M10.27,6.64l2.88-2.88A10,10,0,0,1,24.59,1.35a11.54,11.54,0,0,1,6.05,6.06,10,10,0,0,1-2.4,11.44l-2.88,2.89.07-6.15A5.88,5.88,0,0,0,26.71,9.1,7.48,7.48,0,0,0,22.9,5.29a5.86,5.86,0,0,0-6.48,1.28ZM3.76,13.15,6.3,10.6A3.76,3.76,0,0,0,7.38,13l1.31,1.3-1.9,1.9a5.91,5.91,0,0,0-1.5,6.71A7.48,7.48,0,0,0,9.1,26.71a5.91,5.91,0,0,0,6.71-1.5l1.91-1.91L19,24.61a3.53,3.53,0,0,0,1,.7h0a3.92,3.92,0,0,0,1.16.35l.24,0-2.55,2.55A10,10,0,0,1,7.41,30.65a11.54,11.54,0,0,1-6-6.06A10,10,0,0,1,3.76,13.15Z"
                          className="a"
                        ></path>{" "}
                        <path
                          data-v-da533260=""
                          d="M17,19.21l-3.84,3.9c-2.5,2.54-6.7-1.89-4.27-4.35l3.83-3.9L9.22,11.3a1.07,1.07,0,0,1,0-1.5,1,1,0,0,1,.67-.31l11.35-.12a1,1,0,0,1,1.17,1.21l-.13,11.58a1,1,0,0,1-1.17.91,1.09,1.09,0,0,1-.6-.31Z"
                          className="b"
                        ></path>
                      </svg>
                      <p className="m-1">Your Long URL</p>
                    </div>
                    <input
                      value={url}
                      disabled
                      required
                      placeholder="Enter long link here"
                      type="text"
                      className="form-control form-control-lg py-2 px-6"
                    />
                  </div>
                  <div className="mb-3 mt-2">
                    <div className="d-flex icons mb-2">
                      <GoUnlink size={20} />
                      <p className="m-1">TinyURL</p>
                    </div>
                    <input
                      type="text"
                      value={shareUrl}
                      className="form-control form-control-lg py-2 px-6"
                    />
                  </div>
                  <div className="d-flex mt-2 justify-content-around flex-wrap  icons">
                    <span
                      className="btn border m-1 py-2 px-3 "
                      aria-label="Share"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Open link"
                    >
                      <a href={shareUrl} target="_blank">
                        <FaShare color="rgb(9, 128, 161)" />
                      </a>
                    </span>
                    <span
                      className="btn btn-info m-1 text-white"
                      onClick={handleQr}
                      aria-label="QR Code"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content=" QR"
                    >
                      <IoQrCodeOutline /> QR
                    </span>
                    <span
                      className="btn btn-info m-1 text-white"
                      onClick={toggleShareModal}
                      aria-label="Share"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content=" Share"
                    >
                      <CiShare2 /> SHARE
                    </span>
                    <CopyToClipboard
                      text={shareUrl}
                      onCopy={() => setCopied(true)}
                    >
                      <span
                        className="btn btn-bg m-1 "
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={isCopied ? "COPIED" : "COPY"}
                      >
                        <GoCopy />
                        {isCopied ? "COPIED" : "COPY"}
                      </span>
                    </CopyToClipboard>
                    <Tooltip id="my-tooltip" />
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="background-img">
        <svg
          width={510}
          height={227}
          viewBox="0 0 510 227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="background-img-top"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-87.152 -39.8215C-88.9236 -97.5924 -78.1971 -154.94 -48.4234 -204.479C-20.7542 -250.517 24.1466 -281.369 72.3104 -305.144C118.507 -327.949 168.356 -332.792 219.715 -336.844C285.535 -342.038 369.083 -381.424 412.88 -332.018C457.935 -281.194 406.048 -201.31 399.82 -133.678C395.679 -88.7194 394.135 -46.317 382.55 -2.68C368.135 51.6174 373.1 123.327 324.232 151.04C275.433 178.714 218.732 122.276 162.632 122.037C93.5849 121.742 20.3777 187.044 -37.5683 149.496C-93.687 113.131 -85.1022 27.0177 -87.152 -39.8215Z"
            fill="url(#paint0_linear)"
            fillOpacity="0.4"
          />{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-188.911 -99.6179C-180.859 -164.877 -158.829 -227.486 -116.742 -278.006C-77.6303 -324.955 -21.7855 -351.835 36.4978 -370.192C92.4006 -387.799 149.286 -384.577 207.733 -380.204C282.636 -374.6 383.414 -404.355 424.066 -341.195C465.884 -276.222 393.661 -195.431 374.9 -120.476C362.428 -70.6498 353.32 -23.2462 332.709 23.8C307.062 82.3393 300.177 163.824 240.418 186.486C180.743 209.115 126.807 135.805 63.777 125.782C-13.8004 113.447 -107.459 174.137 -166.079 121.848C-222.85 71.2077 -198.227 -24.1155 -188.911 -99.6179Z"
            fill="url(#paint1_linear)"
            fillOpacity="0.3"
          />{" "}
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="403.713"
              y1="80.0373"
              x2="-60.6291"
              y2="-29.7743"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity={0} />{" "}
              <stop offset={1} stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>{" "}
            <linearGradient
              id="paint1_linear"
              x1="342.121"
              y1="120.477"
              x2={269}
              y2="-1.00001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity={0} />{" "}
              <stop offset={1} stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>
          </defs>
        </svg>{" "}
        <svg
          width={576}
          height={657}
          viewBox="0 0 576 657"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="background-img-bottom"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M119.005 490.408C104.348 426.309 103.735 359.939 126.098 298.105C146.88 240.642 190.23 196.348 238.776 159.237C285.339 123.642 339.92 107.296 396.362 91.4996C468.695 71.2562 553.312 8.95396 613.046 54.4918C674.494 101.336 634.107 201.896 641.998 278.759C647.244 329.854 654.826 377.525 651.472 428.779C647.298 492.553 668.578 571.511 620.111 613.172C571.712 654.774 496.031 604.218 433.356 616.263C356.216 631.089 288.829 720.051 215.905 690.855C145.28 662.579 135.963 564.569 119.005 490.408Z"
            fill="url(#paint0_linear)"
            fillOpacity="0.3"
          />{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M207.243 573.011C186.674 518.997 178.054 461.296 189.988 404.743C201.078 352.187 233.418 308.347 271.157 270.126C307.354 233.466 352.877 212.586 400.086 191.958C460.587 165.523 526.658 100.977 584.206 133.341C643.406 166.634 620.5 259.094 636.735 325.044C647.526 368.884 659.935 409.46 663.26 454.486C667.397 510.511 695.542 576.654 658.427 618.825C621.363 660.938 549.321 626.149 496.228 644.271C430.882 666.576 383.059 752.23 316.019 735.699C251.094 719.689 231.041 635.504 207.243 573.011Z"
            fill="url(#paint1_linear)"
            fillOpacity="0.4"
          />{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M403.49 282.211C453.064 252.494 508.362 233.896 566.131 235.735C619.816 237.444 668.646 261.602 712.889 292.059C755.324 321.272 783.858 362.431 812.44 405.295C849.068 460.228 924.193 513.966 902.414 576.295C880.011 640.412 784.967 634.064 722.882 661.603C681.612 679.91 643.839 699.238 600.092 710.401C545.658 724.291 485.472 763.592 437.449 734.441C389.492 705.33 411.119 628.307 383.973 579.211C350.563 518.785 257.854 486.712 262.381 417.812C266.766 351.086 346.134 316.591 403.49 282.211Z"
            fill="url(#paint2_linear)"
            fillOpacity="0.6"
          />{" "}
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="693.25"
              y1="516.469"
              x2="150.817"
              y2="495.802"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity={0} />{" "}
              <stop offset={1} stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>{" "}
            <linearGradient
              id="paint1_linear"
              x1="710.313"
              y1="525.732"
              x2="235.594"
              y2="573.831"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity={0} />{" "}
              <stop offset={1} stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>{" "}
            <linearGradient
              id="paint2_linear"
              x1="538.194"
              y1="769.211"
              x2="407.651"
              y2="310.266"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity={0} />{" "}
              <stop offset={1} stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="modal-area">
        <div>
          <Modal isOpen={isQRmodalOpen} toggle={toggleQRModal} centered>
            <ModalHeader toggle={toggleQRModal}>QR Link</ModalHeader>
            <ModalBody className="text-center">
              <QRCode value={shareUrl} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleQRModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      {/* Share Modal */}
      <Modal isOpen={isShareModalOpen} toggle={toggleShareModal}>
        <ModalHeader toggle={toggleShareModal}>Share This Link</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-around">
            <WhatsappShareButton url={shareUrl} title="Check out this link!">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl} quote="Check out this link!">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl} title="Check out this link!">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title="Check out this link!">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleShareModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
