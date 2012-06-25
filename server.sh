#!/bin/sh

### BEGIN INIT INFO
# Provides:     mongodb
# Required-Sart:
# Required-Stop:
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description: mongodb
# Description: mongo db server
### END INIT INFO

PROGRAM=/usr/bin/mongod
MONGOPID=`ps -ef | grep 'mongod' | grep -v grep | awk '{print $2}'`

test -x $PROGRAM || exit 0

case "$1" in
	restart)
		echo "restarting..."
		;&
	stop)
		echo "Stopping MongoDB server"		
		if [ ! -z "$MONGOPID" ]; then 		
			kill -15 $MONGOPID
		fi
		;;&  
	start)
		echo "Starting MongoDB server"
		mongod --quiet
		
		echo "Starting Node server"
		node app.js
		
		;;
	status)
		;;
	*)
		echo "Usage: /etc/init.d/mongodb {start|stop|status}"
		exit 1
esac

exit 0