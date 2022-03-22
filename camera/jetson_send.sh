gst-launch-1.0 v4l2src device="$1" ! video/x-raw,width=640,height=480,framerate=30/1 ! nvvidconv ! nvv4l2h264enc ! rtph264pay ! udpsink host=172.16.0.11 port=$2
