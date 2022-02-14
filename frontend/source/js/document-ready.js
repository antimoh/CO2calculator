window.__domLoadDone = false

// Skrypty startując po załadowaniu drzeka DOM:
document.addEventListener('DOMContentLoaded', function () {
  window.__domLoadDone = true
  require('./scripts/script')
}, false)
