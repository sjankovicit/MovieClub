<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:jn="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:template match="/">
<html>
<head>
</head>
<body>
		
		<header><a href="index.html">GO BACK</a></header>
		<center>
		<div id="xmltable">
		<table border="1" class="xmltable1">
		<thead class="thead">
		<tr>
			<th>title</th>
			<th>channel</th>
			<th>description</th>
		</tr>
		</thead>
		<tbody class="tbody">
		<xsl:for-each select="rss/channel/item">
		<tr>
		<td><xsl:value-of
		select="title"/></td>
		<td><xsl:value-of
		select="link"/></td>
		<td><xsl:value-of
		select="description"/></td>
		</tr>
		</xsl:for-each>
		</tbody>
		</table>
		</div>
		</center>



</body>
</html>
</xsl:template>
</xsl:stylesheet>