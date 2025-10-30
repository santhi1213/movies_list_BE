function getPagination(limit, offset) {
  const _limit = limit ? +limit : 20;
  const _offset = offset ? +offset : 0;
  return { limit: _limit, offset: _offset };
}

module.exports = { getPagination };
