TITLE Generating Chris TV Guide
java -Xmx512M -Dlogback.configurationFile=".\logback.xml" -jar HTMLMaker.jar -xml "..\xml\mergexmltv.xmltv" -xsl "..\bin\tvguide.xsl" -xfrm "00favorites.htm" -out "..\tv" -fav "..\crit\favcrit.xml"

java -Xmx512M -Dlogback.configurationFile=".\logback.xml" -jar HTMLMaker.jar -xml "..\xml\mergexmltv.xmltv" -xsl "..\bin\tvguide-ng.xsl" -xfrm "00favorites.htm" -out "..\tv-ng" -fav "..\crit\favcrit.xml"
