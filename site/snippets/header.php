<!DOCTYPE html>

<?php
  $lang = (c::get('lang.current')) ? c::get('lang.current') : c::get('lang.default');
?>

<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="<?php echo $lang ?>"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang="<?php echo $lang ?>"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="<?php echo $lang ?>"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="<?php echo $lang ?>"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?php echo html($page->title()) ?> - <?php echo html($site->title()) ?></title>
        <meta name="description" content="<?php echo html($site->description()) ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow" />

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <?php echo css('assets/css/style.min.css') ?>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->