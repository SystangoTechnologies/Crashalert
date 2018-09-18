
export function getCorrectFontSizeForScreen(PixelRatio, screenWidth, screenHeight, currentFont, widthConst, heightConst){
  let devRatio = PixelRatio.get();
  let factor = (((screenWidth*devRatio)/widthConst)+((screenHeight*devRatio)/heightConst))/2.0;
  let maxFontDifferFactor = 5; //the maximum pixels of font size we can go up or down
  if(factor<=1){
    return currentFont-float2int(maxFontDifferFactor*0.3);
  }else if((factor>=1) && (factor<=1.6)){
    return currentFont-float2int(maxFontDifferFactor*0.1);
  }else if((factor>=1.6) && (factor<=2)){
    return currentFont;
  }else if((factor>=2) && (factor<=3)){
    return currentFont+float2int(maxFontDifferFactor*0.15);
  }else if((factor>=3.0) && (factor<=3.7)){
    return currentFont+float2int(maxFontDifferFactor*0.35);
  }else {
    return currentFont+float2int(maxFontDifferFactor);
  }
}

function float2int (value) {
  return value ;
}
