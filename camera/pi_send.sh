gst-launch-1.0 v4l2src device="$1" ! autovideoconvert ! videoscale ! video/x-raw,width=500,height=300 ! x264enc tune=zerolatency ! rtph264pay  ! udpsink host=172.16.0.11 port=$2
