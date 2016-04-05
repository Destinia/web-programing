<?php
    echo "file name: " . $_FILES["file"]["name"]."<br/>";
    echo "file type: " . $_FILES["file"]["type"]."<br/>";
    echo "file size: " . ($_FILES["file"]["size"] /1024)."<br/>";
    echo "file tmp_name: " . $_FILES["file"]["tmp_name"]."<br/>";

    move_uploaded_file($_FILES["file"]["tmp_name"],"upload/".$_FILES["file"]["name"]);
  }
?>