/* ***** BEGIN LICENSE BLOCK *****

 Copyright (c) 2006-2013  Jason Adams <imagezoom@yellowgorilla.net>

 This file is part of Image Zoom.

 Image Zoom is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 Image Zoom is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Image Zoom; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

 * ***** END LICENSE BLOCK ***** */
var gData;

function optionCache() {
  var optionNames = new Array();
  var optionValues = new Array();

  function setOption(optionName, optionValue) {
    for (var i = 0; i < optionNames.length; i++) {
      if (optionNames[i] == optionName) {
        optionValues[i] = optionValue;
        return;
      }
    }

    optionNames[optionNames.length] = optionName;
    optionValues[optionValues.length] = optionValue;

  }

  optionCache.prototype.getOption = getOption;
  optionCache.prototype.setOption = setOption;
  optionCache.prototype.length = length;

  function getOption(optionName) {

    for (var i = 0; i < optionNames.length; i++) {
      if (optionNames[i] == optionName) {
        return optionValues[i];
      }
    }

  }

  function length() {
    return optionNames.length;
  }
}

// Context Menu Items and their option equivalents
if (net.yellowgorilla.imagezoom.globals.getGeckoVersion() < "1.9") {
  var MenuItems = new Array("context-zoom-zin", "context-zoom-zout", "context-zoom-zreset", "context-zoom-zcustom", "context-zoom-dcustom", "context-zoom-fit", "zoomsub-zin", "zoomsub-zout", "zoomsub-zreset", "zoomsub-zcustom", "zoomsub-dcustom", "zoomsub-fit", "zoomsub-z400", "zoomsub-z200", "zoomsub-z150", "zoomsub-z125", "zoomsub-z100", "zoomsub-z75", "zoomsub-z50", "zoomsub-z25", "zoomsub-z10");
  var OptionItems = new Array("mmZoomIO", "mmZoomIO", "mmReset", "mmCustomZoom", "mmCustomDim", "mmFitWindow", "smZoomIO", "smZoomIO", "smReset", "smCustomZoom", "smCustomDim", "smFitWindow", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts");
} else {
  var MenuItems = new Array("context-zoom-zin", "context-zoom-zout", "context-zoom-zreset", "context-zoom-zcustom", "context-zoom-dcustom", "context-zoom-fit", "context-zoom-rotate-right", "context-zoom-rotate-left", "context-zoom-rotate-180", "context-zoom-rotate-reset", "zoomsub-zin", "zoomsub-zout", "zoomsub-zreset", "zoomsub-rotate-right", "zoomsub-rotate-left", "zoomsub-rotate-180", "zoomsub-rotate-reset", "zoomsub-zcustom", "zoomsub-dcustom", "zoomsub-fit", "zoomsub-z400", "zoomsub-z200", "zoomsub-z150", "zoomsub-z125", "zoomsub-z100", "zoomsub-z75", "zoomsub-z50", "zoomsub-z25", "zoomsub-z10");
  var OptionItems = new Array("mmZoomIO", "mmZoomIO", "mmReset", "mmCustomZoom", "mmCustomDim", "mmFitWindow", "mmRotateRight", "mmRotateLeft", "mmRotate180", "mmRotateReset", "smZoomIO", "smZoomIO", "smReset", "smRotateRight", "smRotateLeft", "smRotate180", "smRotateReset", "smCustomZoom", "smCustomDim", "smFitWindow", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts", "smZoomPcts");
}
var MenuOptions = new optionCache();

// Preference Service objects
var nsIPrefServiceObj = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var nsIPrefBranchObj = nsIPrefServiceObj.getBranch("extensions.imagezoom.");


// Save options for Firefox and Thunderbird


function imagezoom_saveOptions() {
  if (!validateOptions()) return false;

  for (var i = 0; i < MenuItems.length; i++) {
    if (document.getElementById(MenuItems[i]).tagName.toLowerCase() == "checkbox") {
      nsIPrefBranchObj.setBoolPref(OptionItems[i], MenuOptions.getOption(OptionItems[i]));
    }
  }
  nsIPrefBranchObj.setBoolPref("usescroll", document.getElementById("imagezoomusemouseoptions").checked);
  nsIPrefBranchObj.setIntPref("scrollvalue", document.getElementById("imagezoomscrollvalue").value);
  nsIPrefBranchObj.setIntPref("scrollmode", document.getElementById("imagezoomscrollmode").value);

  nsIPrefBranchObj.setIntPref("zoomvalue", document.getElementById("imagezoomzoomvalue").value);
  nsIPrefBranchObj.setBoolPref("autocenter", document.getElementById("imagezoomautocenter").checked);

  nsIPrefBranchObj.setIntPref("triggerbutton", document.getElementById("imagezoommouseaccess").value);
  nsIPrefBranchObj.setIntPref("imagefitbutton", document.getElementById("imagezoomimagefitbutton").value);
  nsIPrefBranchObj.setIntPref("imageresetbutton", document.getElementById("imagezoomimageresetbutton").value);
  nsIPrefBranchObj.setBoolPref("toggleFitReset", document.getElementById("imagezoomtogglefitreset").checked);

  nsIPrefBranchObj.setBoolPref("reversescrollzoom", document.getElementById("imagezoomreversescroll").checked);

}

function validateOptions() {
  if ((document.getElementById("imagezoommouseaccess").value == document.getElementById("imagezoomimagefitbutton").value) || (document.getElementById("imagezoommouseaccess").value == document.getElementById("imagezoomimageresetbutton").value) || ((document.getElementById("imagezoomimageresetbutton").value == document.getElementById("imagezoomimagefitbutton").value) && (document.getElementById("imagezoomimagefitbutton").value != 0))) {
    alert(document.getElementById("bundle_ImageZoom").getString("op_mouse_error"));
    return false;
  }
  return true;
}
// Mozilla calls this function when the options dialog is loaded


function Startup() {
  init();
}

// Initialise options for Firefox and Thunderbird


function imagezoom_initializeOptions() {

  document.getElementById("imagezoomusemouseoptions").checked = nsIPrefBranchObj.getBoolPref("usescroll");

  var scroll = nsIPrefBranchObj.getIntPref("scrollvalue");
  var scrollValueBox = document.getElementById("imagezoomscrollvalue");
  scrollValueBox.selectedItem = scrollValueBox.getElementsByAttribute("value", scroll)[0];

  var scroll = nsIPrefBranchObj.getIntPref("scrollmode");
  var scrollValueBox = document.getElementById("imagezoomscrollmode");
  scrollValueBox.selectedItem = scrollValueBox.getElementsByAttribute("value", scroll)[0];

  var scroll = nsIPrefBranchObj.getIntPref("triggerbutton");
  var scrollValueBox = document.getElementById("imagezoommouseaccess");
  scrollValueBox.selectedItem = scrollValueBox.getElementsByAttribute("value", scroll)[0];

  var scroll = nsIPrefBranchObj.getIntPref("imagefitbutton");
  var scrollValueBox = document.getElementById("imagezoomimagefitbutton");
  scrollValueBox.selectedItem = scrollValueBox.getElementsByAttribute("value", scroll)[0];

  var scroll = nsIPrefBranchObj.getIntPref("imageresetbutton");
  var scrollValueBox = document.getElementById("imagezoomimageresetbutton");
  scrollValueBox.selectedItem = scrollValueBox.getElementsByAttribute("value", scroll)[0];

  var zoom = nsIPrefBranchObj.getIntPref("zoomvalue");
  var zoomValueBox = document.getElementById("imagezoomzoomvalue");
  zoomValueBox.selectedItem = zoomValueBox.getElementsByAttribute("value", zoom)[0];

  document.getElementById("imagezoomautocenter").checked = nsIPrefBranchObj.getBoolPref("autocenter");
  document.getElementById("imagezoomreversescroll").checked = nsIPrefBranchObj.getBoolPref("reversescrollzoom");
  document.getElementById("imagezoomtogglefitreset").checked = nsIPrefBranchObj.getBoolPref("toggleFitReset");

  for (var i = 0; i < MenuItems.length; i++) {
    MenuOptions.setOption(OptionItems[i], nsIPrefBranchObj.getBoolPref(OptionItems[i]));
    document.getElementById(MenuItems[i]).setAttribute("hidden", false);
  }

  setDisableAllChildren(document.getElementById('mouseoptions'), !document.getElementById("imagezoomusemouseoptions").checked);

  document.getElementById('rotateTab').setAttribute("hidden", (net.yellowgorilla.imagezoom.globals.getGeckoVersion() < "1.9"));

  setImageZoomMenu();
}

function setImageZoomMenu() {

  // Display the correct menu items depending on options and whether an image was clicked
  for (var i = 0; i < MenuItems.length; i++) {
    if (document.getElementById(MenuItems[i]) == null) {
      alert(MenuItems[i]);
    }
    document.getElementById(MenuItems[i]).setAttribute("checked", MenuOptions.getOption(OptionItems[i]));
  }
  // Show the Zoom Image container if there are subitems visible, else hide
  if (document.getElementById("submenu").getElementsByAttribute("checked", true).length > 0) document.getElementById("context-zoomsub").checked = true;
  else document.getElementById("context-zoomsub").checked = false;
  // Show the Rotate Image container if there are subitems visible, else hide
  if (document.getElementById("subrotatemenu").getElementsByAttribute("checked", true).length > 0) document.getElementById("context-rotatesub").checked = true;
  else document.getElementById("context-rotatesub").checked = false;
}

function setPreference(izCheck) {
  var i;
  for (i = 0; i < MenuItems.length; i++) {
    if (izCheck.id == MenuItems[i]) break;
  }

  MenuOptions.setOption(OptionItems[i], izCheck.checked);
}

function setOption(izCheck) {
  setPreference(izCheck);
  setImageZoomMenu();
}

function setDisableAllChildren(xulElement, disabled) {
  for (var i = 0; i < xulElement.childNodes.length; i++) {
    xulElement.childNodes[i].disabled = disabled;
    setDisableAllChildren(xulElement.childNodes[i], disabled);
  }
}

function toggleSubMenu() {
  var checkboxes = document.getElementById("submenu").getElementsByTagName("checkbox");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = document.getElementById("context-zoomsub").checked;
    setPreference(checkboxes[i]);
  }
  setImageZoomMenu();
}


function toggleRotateMenu() {
  var checkboxes = document.getElementById("subrotatemenu").getElementsByTagName("checkbox");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = document.getElementById("context-rotatesub").checked;
    setPreference(checkboxes[i]);
  }
  setImageZoomMenu();
}

function togglePercentages() {
  var pctOption = document.getElementById("zoomsub-z100");
  pctOption.checked = !pctOption.checked;
  setOption(pctOption);
}