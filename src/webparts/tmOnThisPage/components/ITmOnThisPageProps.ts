
  import { DisplayMode } from "@microsoft/sp-core-library";

  export interface ITmOnThisPageWebPartProps {
    showBackToTop: boolean;
    backToTopText: string;
    showOTPHeading: boolean;
    headingText: string;
    levelsToShow: string;
    showBackToPreviousPage: boolean;
    backToPreviousText: string;
    fixOTP: boolean;
    iconOTPItem: string;
    iconOTPItem2: string;
    iconPreviousPage: string;
    otpBackgroundColor: string;
    otpFontColor: string;
    buttonCopySetting?: string;
    buttonPasteSettings?: string;
    displayMode?: DisplayMode;
  }

  export interface ITmOnThisPageProps extends ITmOnThisPageWebPartProps { }

  export interface IOTPItem {
    text: string;
    icon: string;
    onClickAction?: any;
    anchorID?: string;
    isBackToPreviousPage?: boolean;
    level: string;
  }
