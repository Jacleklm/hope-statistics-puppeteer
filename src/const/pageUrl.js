const commUrl = 'http://202.116.83.50/hope/'

const getLogsUrl = (page) => {
  return `${commUrl}Journals/Index_${page}.aspx`;
}
const noteUrl = {
  frontEnd: commUrl + 'FrontEnd/Index.aspx'
}
const summaryUrl = commUrl + 'Summary/Index.aspx';

const pageUrl = {
  getLogsUrl,
  noteUrl,
  summaryUrl,
}

module.exports = pageUrl;