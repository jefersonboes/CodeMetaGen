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

function PascalMeta () {

	const ident = '  ';

	var createAttribute = function (field, typeName) {
	    var str = ident + 'F' + field + ': ' + typeName + ';\n';

	    return str;
	}

	var createGetSignature = function (field, typeName)	{
	    /*
	    function GetField: Type;
	    */

	    var str = ident + 'function Get' + field + ': ' + typeName + ';\n';

	    return str;
	}

	var createGet = function (classType, field, typeName)	{
	    /*
	    function TClass.GetField: Type;
	    begin
	      Result := FField;
	    end;
	    */

	    var str = 'function ' + classType + '.Get' + field + ': ' + typeName + ';\n';
	    str += 'begin\n';
	    str += ident + 'Result := F' + field + ';\n';
	    str += 'end;\n';

	    return str;
	}

	var createSetSignature = function (field, typeName)	{
	    /*
	    procedure SetField(const Value: Type);
	    */

	    var str = ident + 'procedure Set' + field + '(const Value: ' +  typeName + ');\n';

	    return str;
	}

	var createSet = function (classType, field, typeName) {
	    /*
	    procedure TClass.SetField(const Value: Type);
	    begin
	        FField := Value;
	    end;
	    */

	    var str = 'procedure ' + classType + '.Set' + field + '(const Value: ' +  typeName + ');\n';
	    str += 'begin\n';
	    str += ident + 'F' + field + ' := Value;\n';
	    str += 'end;\n';

	    return str;
	}

	var createProperty = function (field, typeName)	{
	    /*
	    property Field: Type read GetField write SetField;
	    */

	    var str = ident + 'property ' + field + ': ' + typeName + ' read Get' + field + ' write Set' + field  + ';\n';

	    return str;
	}

	var createFieldsBlock = function (fields, functionCall, breakLineContent, classType) {
	    var str = '';

	    for (var i = 0; i < fields.length; i++) {
	        var field = fields[i];
	        var name = field[0];
	        var typeName = field[1];

	        name = camelCase(name);
	        typeName = camelCase(typeName);

	        if (breakLineContent) {
	            if (str.length > 0)
	                str += '\n';
	        }

					if (classType != undefined)
							str += functionCall(classType, name, typeName);
					else
	        		str += functionCall(name, typeName);
	    }

	    return str;
	}

	this.createClass = function (className, fields) {
	    /*
	    TClass = class
	    private
	      fields
	      gets
	      sets
	    sets
	    public
	    end;

	    implementation
	    {TClass}
	    gets
	    gets
	    */

	    className = camelCase(className);

	    var str = 'T' + className + ' = class\n';
	    str += 'private\n';
	    str += createFieldsBlock(fields, createAttribute);
	    str += createFieldsBlock(fields, createGetSignature);
	    str += createFieldsBlock(fields, createSetSignature);
	    str += 'public\n';
	    str += createFieldsBlock(fields, createProperty);
	    str += 'end;\n';

	    str += '\n';
	    str += '{T' + className + '}\n\n';

	    str += createFieldsBlock(fields, createGet, true, 'T' + className);
	    str += '\n';
	    str += createFieldsBlock(fields, createSet, true, 'T' + className);

	    return str
	}

	this.createInterface = function (interfaceName, fields) {
	    /*
	    IInterface = interface
	    gets
	    sets
	    propertys
	    end;
	    */

	    interfaceName = camelCase(interfaceName);

	    var str = 'I' + interfaceName + ' = interface\n';
	    str += createFieldsBlock(fields, createGetSignature);
	    str += createFieldsBlock(fields, createSetSignature);
	    str += createFieldsBlock(fields, createProperty);
	    str += 'end;\n';

	    return str
	}
}
