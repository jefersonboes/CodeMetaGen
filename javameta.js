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

function JavaMeta () {

	const ident = '\t';

	var createAttribute = function (field, typeName) {
		/*
		private Type field;
		*/
	    var str = ident + 'private ' + typeName + ' ' + field + ';\n';

	    return str;
	}

	var createGetSignature = function (field, typeName)	{
	    /*
	    type getField;
	    */

	    var str = ident + typeName + ' get' + field + '();\n';
	    
	    return str;
	}

	var createGet = function (field, typeName)	{
	    /*
	    public Type getField
	    {
	      return field;
	    }
	    */

	    var str = ident + 'public ' + typeName + ' get' + field + '();\n';
	    str += ident + '{\n';
	    str += ident + ident + 'return ' + field + ';\n';
	    str += ident + '}\n';

	    return str;
	}

	var createSetSignature = function (field, typeName)	{
		/*
	    void setField(Type field);
	    */

	    var str = ident + 'void set' + field + '(' +  typeName + ' ' + field + ');\n';

	    return str;
	}

	var createSet = function (field, typeName) {
	    /*
	    public setField(Type field);
	    {
	      this.field = field;
	    }
	    */

	    var str = ident + 'public ' + typeName + ' set' + field + '(' +  typeName + ' ' + field + ');\n';
	    str += ident + '{\n';
	    str += ident + ident + 'this.' + field + ' = ' + field + ';\n';
	    str += ident + '}\n';

	    return str;
	}

	var createFieldsBlock = function (fields, functionCall, breakLineContent) {
	    var str = '';

	    for (var i = 0; i < fields.length; i++) {
	        var field = fields[i];
	        var name = field[0];
	        var typeName = field[1];

	        if (breakLineContent) {
	            if (str.length > 0)
	                str += '\n';
	        }

	        str += functionCall(name, typeName);
	    }

	    return str;
	}

	this.createClass = function (className, fields) {
	    /*
	    class ClassName
	    {
	    private fields
	    public gets
	    public sets
	    }
	    */

	    className = camelCase(className);

	    var str = 'class ' + className + '\n';
	    str += '{\n';
	    str += createFieldsBlock(fields, createAttribute);
	    str += '\n';
	    str += createFieldsBlock(fields, createGet, true);
	    str += '\n';
	    str += createFieldsBlock(fields, createSet, true);
	    str += '}\n';

	    return str
	}

	this.createInterface = function (interfaceName, fields) {
	    /*
	    interface ClassName
	    {
	    gets
	    sets
	    }
	    */

	    interfaceName = camelCase(interfaceName);

	    var str = 'interface ' + interfaceName + '\n';
	    str += '{\n';
	    str += createFieldsBlock(fields, createGetSignature, false);
	    str += createFieldsBlock(fields, createSetSignature, false);
	    str += '}\n';

	     return str
	}	
}
