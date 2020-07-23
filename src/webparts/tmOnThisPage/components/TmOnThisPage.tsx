/**
 *  OnThisPage Webpart
 *
 * Author: Pen Warner
 * Copyright  (c) 2020
 */
import * as React from "react";
import styles from "./TmOnThisPage.module.scss";
import { ITmOnThisPageProps, IOTPItem } from "../components/ITmOnThisPageProps";
import * as strings from "TmOnThisPageWebPartStrings";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class TmOnThisPage extends React.Component<ITmOnThisPageProps, { isTextPresent: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { isTextPresent: false };
  }
  public render(): React.ReactElement<ITmOnThisPageProps> {
  //console.log(this.props.fixOTP );
  const containerStyle: any = {
    //    position: this.props.fixOTP === false ? "relative" : "fixed",
    position: "relative",
    //top: this.props.fixOTP === false ? "" : "225px",
    //width: this.props.fixOTP === false ? "" : "350px",
    backgroundColor: this.props.otpBackgroundColor ==="" ? "#335A8A" : this.props.otpBackgroundColor,
    color: this.props.otpFontColor ==="" ? "Black" : this.props.otpFontColor,
    borderRadius: "3px",
    paddingLeft:"10px",
    paddingTop:"10px",


  };

    if (this.state.isTextPresent) {
      return (
      <div id="OnThisPage" className={styles.onThisPage} style={containerStyle}>
          <div className={`ms-fadeIn400 ${styles.container} }`}>
            <div className={styles.row}>
              <div className={styles.column}>
                {this._renderOTP()}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  public componentDidMount(): void {
    if (!this.state.isTextPresent) {
      window.setTimeout(() => {
        this.setState({ isTextPresent: true });
      }, 1000);
    }

  }
  private _renderOTP = (): JSX.Element => {
    return (
      <div>
        {this._renderTitle()}
        {
          document.location.href.indexOf("Mode=Edit") !== -1 || this.props.displayMode === DisplayMode.Edit
           ? this._renderOTPItemsInEditMode() : this._renderOTPItems()
        }
        {this._renderBack()}
      </div>
    );
  }
  private _renderOTPItems = (): JSX.Element => {
    let selector = "";
    if(this.props.levelsToShow == "1"){
      selector = "h2";
    }else{
       selector = "h2,h3";
    }
    const items: any = document.querySelectorAll(selector);

    if (items && items.length > 0) {
      let itemJSX: JSX.Element[] = [];
      for (let index: number = 0; index < items.length; index++) {

        let headingLevel = "1";
        let levelIcon = "";
        if(items[index].outerHTML.startsWith('<h2')){
          levelIcon = this.props.iconOTPItem;
        }else{
          headingLevel = "2";
          levelIcon = this.props.iconOTPItem2;
        }
        let headerText = items[index].innerText;
        let anchorID: string = headerText.split(' ').join('-');
        items[index].innerHTML = `<a style="text-decoration:none; color: inherit;" id="${anchorID}">${headerText}</a>`;
        if (index > 0 && this.props.showBackToTop && headingLevel === "1") {
          items[index].outerHTML = `
            <div style="border-bottom: 1px solid ${this.props.otpFontColor}; padding-bottom: 2px; text-align: right; font-size: small;">
              <a href="#OTPTop" style="text-decoration: none; cursor: pointer;">
                ${this.props.backToTopText.trim() === "" ? strings.backToTopDefaultValue : this.props.backToTopText }
              </a>
            </div>
            ${items[index].outerHTML}
            `;
        }
        itemJSX.push(
          this._renderOTPItem(
            { text: headerText, icon: levelIcon, anchorID: anchorID, level: headingLevel }
          ));
      }
      return (
        <div>
          {
            itemJSX.map((item, idx) => {
              return item;
            })
          }
        </div>
      );
    } else {
      return null;
    }
  }
  private _renderOTPItemsInEditMode = (): JSX.Element => {
    return (
      <div>
        <div className={styles.otpInEditModeDescription}>
          {strings.pageInEditMode}
        </div>
        {this._renderOTPItem({ text: strings.sampleItemLabel, icon: this.props.iconOTPItem, level: "1" })}
        {this._renderOTPItem({ text: strings.sampleItemLabel, icon: this.props.iconOTPItem2, level: "2" })}
        {this._renderOTPItem({ text: strings.sampleItemLabel, icon: this.props.iconOTPItem, level: "1" })}
      </div>
    );
  }
  private _renderOTPItem = (otpItemProps: IOTPItem): JSX.Element => {
    return (
      <div className={`${otpItemProps.level == "1" ? styles.otpItem : styles.otpItem2}  ${otpItemProps.isBackToPreviousPage ? styles.otpItemBackToPreviousPage : ""}`}
        onClick={otpItemProps.onClickAction}>
        <span className={`${otpItemProps.level == "1" ? styles.otpIcon : styles.otpIcon2}`}>
          <Icon iconName={`${otpItemProps.icon}`}></Icon>
        </span>
        {otpItemProps.anchorID ?
          <span className={`${otpItemProps.level == "1" ? styles.otpItemText: styles.otpItemText2}`}>
            <a href={`#${otpItemProps.anchorID}`}>{otpItemProps.text}</a>
          </span>
          :
          <span className={styles.otpItemText}>
            {otpItemProps.text}
          </span>
        }
      </div>
    );
  }
  private _renderTitle = (): JSX.Element => {
    if (this.props.showOTPHeading) {
      return (
        <div className={styles.title}>
          {this.props.headingText.trim() === "" ? strings.headingTextDefaultValue : this.props.headingText}
        </div>
      );
    } else {
      return null;
    }
  }
  private _renderBack = (): JSX.Element => {
    if (this.props.showBackToPreviousPage) {
      return this._renderOTPItem({
        text: this.props.backToPreviousText.trim() === "" ? strings.backToPreviousDefaultValue : this.props.backToPreviousText,
        icon: this.props.iconPreviousPage,
        onClickAction: this.__onClickBack,
        isBackToPreviousPage: true,
        level: "1"
      });
    } else {
      return null;
    }
  }
  private __onClickBack = (): void => {
    if (DisplayMode.Read) {
      window.history.back();
    }
  }
}
