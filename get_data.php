<?php

//TODO use PHP to do this
$hits = exec('cat /proc/spl/kstat/zfs/arcstats  | grep -w hits | awk \'{ print $3}\'');
$l2hits = exec('cat /proc/spl/kstat/zfs/arcstats | grep -w l2_hits | awk \'{ print $3}\'');
$misses = exec('cat /proc/spl/kstat/zfs/arcstats | grep -w misses | awk \'{ print $3}\'');
$l2misses = exec('cat /proc/spl/kstat/zfs/arcstats | grep -w l2_misses | awk \'{ print $3}\'');

$data = array("hits" => $hits, "l2hits" => $l2hits, "misses" => $misses, "l2misses" => $l2misses);

echo json_encode($data);