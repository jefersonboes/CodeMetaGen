/* Code Meta Gen - Coding Utils
 * Copyright (C) 2017 Jeferson Boes
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

window.onload = function() {
	var classname = document.getElementById("classname");
	
	var fields = document.getElementById("fields");
	var butGen = document.getElementById("butGen");
	var output = document.getElementById("output");
	var ckClass = document.getElementById("ckClass");
	var ckInteface = document.getElementById("ckInteface");
	var ckPreserveFieldCase = document.getElementById("ckPreserveFieldCase");
	var language = document.getElementById("language");

	butGen.onclick = function(e) {
	    var fieldsArray = parseCreateFields(fields.value);
	    var str = '';

	    if (language.value == 'objectPascal') {
			var meta = new PascalMeta();
			meta.setPreserveFieldCase(ckPreserveFieldCase.checked);
		} else
			var meta = new JavaMeta();

		if (ckInteface.checked) {
			str += meta.createInterface(classname.value, fieldsArray);
		}

	    if (ckClass.checked) {
			if (str.length > 0)
				str += '\n';
			str += meta.createClass(classname.value, fieldsArray, ckInteface.checked);
		}

	    output.value = str;
	}
}
