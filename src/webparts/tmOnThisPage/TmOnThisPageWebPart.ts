
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from "TmOnThisPageWebPartStrings";
import TmOnThisPage from "./components/TmOnThisPage";
import { ITmOnThisPageWebPartProps, ITmOnThisPageProps } from "./components/ITmOnThisPageProps";

export default class TmOnThisPageWebPart extends BaseClientSideWebPart<ITmOnThisPageWebPartProps> {

  public render(): void {

    const element: React.ReactElement<ITmOnThisPageProps> = React.createElement(
      TmOnThisPage, {
        showBackToTop: this.properties.showBackToTop,
        backToTopText: this.properties.backToTopText,
        showOTPHeading: this.properties.showOTPHeading,
        headingText: this.properties.headingText,
        levelsToShow: this.properties.levelsToShow,
        showBackToPreviousPage: this.properties.showBackToPreviousPage,
        backToPreviousText: this.properties.backToPreviousText,
        iconOTPItem: this.properties.iconOTPItem,
        iconOTPItem2: this.properties.iconOTPItem2,
        iconPreviousPage: this.properties.iconPreviousPage,
        displayMode: this.displayMode,
        fixOTP: this.properties.fixOTP,
        otpBackgroundColor: this.properties.otpBackgroundColor,
        otpFontColor: this.properties.otpFontColor
      }
    );
    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: false,
              groupFields: [

                PropertyPaneToggle("showOTPHeading", {
                  label: strings.showOTPHeading
                }),
                PropertyPaneTextField("headingText", {
                  label: strings.headingText, disabled: !this.properties.showOTPHeading,
                  onGetErrorMessage: this._checkToggleField,
                  value : strings.headingTextDefaultValue
                }),
                PropertyPaneDropdown("levelsToShow", {
                  label: strings.levelsToShow, options: [
                    { key: "1", text: strings.oneLevelText },
                    { key: "2", text: strings.twoLevelsText }
                  ]
                }),
                PropertyPaneToggle("showBackToPreviousPage", {
                  label: strings.showBackToPreviousPage
                }),
                PropertyPaneTextField("backToPreviousText", {
                  label: strings.backToPreviousText, description: strings.backToPreviousFieldDescription,
                  disabled: !this.properties.showBackToPreviousPage,
                  onGetErrorMessage: this._checkToggleField,
                  value: strings.backToPreviousDefaultValue
                }),
                PropertyPaneToggle("showBackToTop", {
                  label: strings.showBackToTop
                }),
                PropertyPaneTextField("backToTopText", {
                  label: strings.backToTopText, description: strings.backToTopFieldDescription,
                  disabled: !this.properties.showBackToTop,
                  onGetErrorMessage: this._checkToggleField,
                  value: strings.backToTopDefaultValue
                })
                //,
                //PropertyPaneToggle("fixOTP", {
                  //label: strings.fixOTP
                //})
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneDescription2
          },
          groups: [
            {
              groupName: strings.BasicGroupName2, isCollapsed: false,
              groupFields: [
                PropertyPaneTextField("iconOTPItem", {
                  label: strings.iconOTPItem, description: strings.iconDescription,
                  onGetErrorMessage: this._checkIconField
                }),
                PropertyPaneTextField("iconOTPItem2", {
                  label: strings.iconOTPItem2, description: strings.iconDescription,
                  onGetErrorMessage: this._checkIconField
                }),
                PropertyPaneTextField("iconPreviousPage", {
                  label: strings.iconPreviousPage, description: strings.iconDescription,
                  onGetErrorMessage: this._checkIconField
                }),
                PropertyPaneTextField("otpBackgroundColor", {
                  label: strings.otpBackgroundColor, description: strings.otpBackgroundColorDescription
                }),
                PropertyPaneTextField("otpFontColor", {
                  label: strings.otpFontcolor, description: strings.otpFontcolorDescription
                })
              ]
            }
          ]
        }

      ]
    };
  }
  private _checkToggleField = (value: string): string => {
    if (value === "") {
      return strings.errorToggleFieldEmpty;
    } else {
      return "";
    }
  }
  private _checkIconField = (value: string): string => {
    if (value === "") {
      return strings.errorFieldCannotBeEmpty;
    } else {
      return "";
    }
  }
}
