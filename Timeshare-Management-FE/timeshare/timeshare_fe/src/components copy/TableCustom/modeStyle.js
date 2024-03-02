const defaultSetting = {
  borderColor: "#f0f0f0", //màu border
  cellFontSize: 13, //font size
  cellFontSizeMD: 13, //font size screen middle size
  cellFontSizeSM: 13, //font size screen small size
  cellPaddingBlock: 8, //padding trên dưới
  cellPaddingBlockMD: 6, //padding trên dưới
  cellPaddingBlockSM: 6, //padding trên dưới
  cellPaddingInline: 8, //padding 2 bên
  cellPaddingInlineMD: 8, //padding 2 bên screen middle size
  cellPaddingInlineSM: 6, //padding 2 bên screen small size
  // header
  headerBorderRadius: 8, //radius header
  headerBg: "#fafafa", //background-header
  headerColor: "#333", //Màu chữ header
  //footer
  footerBg: "#fff", //background-footer
  footerColor: "#333", //background-footer
  // row
  rowExpandedBg: "#fff", //Màu nền chữ row mở rộng
  rowHoverBg: "#fafafa", //Màu row khi hover
  rowSelectedBg: "#e6f4ff", //Màu row selected
  rowSelectedHoverBg: "#bae0ff", //Màu hover row selected
}
const modeStyle = {
  isPrimary: {
    ...defaultSetting,
    // header
    headerBg: "var(--color-primary)",
    headerColor: "#fff",
    // row
    rowExpandedBg: "#fff",
    rowHoverBg: "rgba(227, 243, 254, 1)",
    rowSelectedBg: "rgba(227, 243, 254, 1)",
    rowSelectedHoverBg: "rgba(227, 243, 254, 1)",
  },
}

export default modeStyle
