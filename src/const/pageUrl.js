const commUrl = 'http://202.116.83.50/hope/'

const logsUrl = commUrl + 'Journals/Index.aspx';
const noteUrl = {
  frontEnd: commUrl + 'FrontEnd/Index.aspx'
}
const summaryUrl = commUrl + 'Summary/Index.aspx';

const pageUrl = {
  logsUrl,
  noteUrl,
  summaryUrl,
}

module.exports = pageUrl;