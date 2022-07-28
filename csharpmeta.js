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

function CSharpMeta () {

	const ident = '\t';

	var translateType = function (typeName) {
		if (typeName.includes('string'))
			return 'string';
		else if (typeName.includes('UUID'))
			return 'Guid';
		else if (typeName.includes('float'))
			return 'Double';
		else if (typeName.includes('TimeStamp'))
			return 'DateTime';
		else
			return typeName;
	}

	var dbLimitSize = function (typeName) {
		let i = typeName.indexOf('(');
		if (i < 0)
			return '';
		let j = typeName.indexOf(')', i);
		return typeName.slice(i + 1, j);
	}

	var createProperty = function (field, typeName, typeControl) {

		var dbTypeControl = '';
		var str = ident + '[JsonProperty("' + field + '")]\n';
		
		if (translateType(typeName) === 'string') {
			var limitSize = dbLimitSize(typeName);
			if (limitSize !== '')
				dbTypeControl += ident + '[MaxLength('+ limitSize + ', ErrorMessage = "O tamanho não pode ser maior que ' + limitSize + ' caracteres.")';
		}

		if (translateType(typeName) === 'Double') {
			var typeSize = dbLimitSize(typeName);
			if (typeSize !== '') {
				if (dbTypeControl !== '')
					dbTypeControl += ', ';
				else
					dbTypeControl += ident + '[';

				dbTypeControl += 'Column(TypeName = "DECIMAL(' + typeSize + '")';
			}
		}

		if (translateType(typeName) === 'DateTime') {		
			if (dbTypeControl !== '')
				dbTypeControl += ', ';
			else
				dbTypeControl += ident + '[';

			dbTypeControl += 'DataType(DataType.DateTime)';
		}

		if (typeControl === 'PK' || typeControl === 'PFK') {
			if (dbTypeControl !== '')
				dbTypeControl += ', ';
			else
				dbTypeControl += ident + '[';

			dbTypeControl += 'Key';
		}

		if (typeControl === 'NN') {
			if (dbTypeControl !== '')
				dbTypeControl += ', ';
			else
				dbTypeControl += ident + '[';

			dbTypeControl += 'Required(ErrorMessage = "Campo obrigatório")';
		}
			
		if (dbTypeControl !== '')
			str += dbTypeControl + ']\n';

	    str += ident + 'public ' + translateType(typeName) + ' ' + camelCase(field) + ' { get; set; }\n';
	    return str;
	}

	var createFieldsBlock = function (fields, functionCall, breakLineContent) {
	    var str = '';

	    for (var i = 0; i < fields.length; i++) {
	        var field = fields[i];
			var typeControl = field[0].toUpperCase();
			var id = 0;
			if (typeControl !== 'NN' && typeControl !== 'PK' && typeControl !== 'FK' && typeControl !== 'PFK')
				typeControl = '';
			else
				id = 1;
	        var name = field[id];
	        var typeName = field[id + 1];

	        if (breakLineContent) {
	            if (str.length > 0)
	                str += '\n';
	        }

	        str += functionCall(name, typeName, typeControl);
	    }

	    return str;
	}

	this.createClass = function (className, fields, gerarInterface, tablename) {

	    className = camelCase(className);

	    var str = '';
		if (tablename !== '')
			str += '[Table("'+ tablename + '")]\n';
		str += 'public class ' + className + '\n';
	    str += '{\n';

		str += createFieldsBlock(fields, createProperty, true);

	    str += '}\n';

	    return str
	}	
}
