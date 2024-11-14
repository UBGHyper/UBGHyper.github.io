<?php
#
# A low-brow script to show the number of current viewers of a
#  page. Here is an example:
#
#    http://jeffpalm.com/webcounter/
#
# To use:
#
# 1. Uplod this script to your server and fill in the Options.
# 2. Add the following to the <head> tag of a page:
#    <script type="text/javascript" 
#            src="path-to-jquery.min.js"></script>
# 3. Add this to any page to show the number of current users:
#     <script type="text/javascript" 
#             src="/path/to/webcounter.php"></script>

# ------------------------------------------------------------
# -------------------------- Options -------------------------
# ------------------------------------------------------------

# Set this to the host name on which this will run
define(DOMAIN, 'TODO');

# Create this directory and chmod it 777
define(COUNTS_DIR, '__cu'); 

# ------------------------------------------------------------
# ---------------- Change nothing below here -----------------
# ------------------------------------------------------------
function getPageFile($page) {
  return COUNTS_DIR . '/' . md5($page) . '.txt';
}

function getCount($page) {
  $fileName = getPageFile($page);
  if (file_exists($fileName)) {
    $count = file_get_contents($fileName);
  } else {
    $count = 0;
  }
  return $count;
}

function setCount($page, $count) {
  $fileName = getPageFile($page);
  $handle = fopen($fileName, "w") or die("can't open file");
  fwrite($handle, $count);
  fclose($handle);
  return $count;
}

function jsOutput($s) {
  echo "document.write('$s');";
}

function outputOnUnloadCode($self) {
  echo '$(window).bind("beforeunload", function() {'
    . 'var s = document.createElement("script");'
    . 's.src="' . $self . '?logout=1";'
    . 'document.body.appendChild(s);'
    . 'document.write("...");'
    . '});';
}

function main() {
  if ($_SERVER['HTTP_HOST'] != DOMAIN) {
    return;
  }
  $logout = $_REQUEST['logout'];
  $page = $_SERVER['HTTP_REFERER'];
  if (!$page) {
    return;
  }
  $page = preg_replace('/\?.*/', '', $page);
  $page = preg_replace('/\#.*/', '', $page);
  $self = $_SERVER['PHP_SELF'];
  if (preg_match('/.*$page/', $self)) {
    jsOutput(-1);
    return;
  }
  
  $count = getCount($page);
  if ($logout) {
    $count = setCount($page, $count - 1);
    jsOutput($count);  
  } else {
    $count = getCount($page);
    $count += 1;
    setCount($page, $count);
    jsOutput($count);
    outputOnUnloadCode($self);
  }
}

header('Content: text/plain');
main();

?>
