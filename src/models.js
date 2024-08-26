/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export function createBaseAppData() {
  return { entrypoint: "", files: {}, requirements: [] };
}

export const AppData = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.entrypoint !== "") {
      writer.uint32(10).string(message.entrypoint);
    }
    Object.entries(message.files).forEach(([key, value]) => {
      AppData_FilesEntry.encode(
        { key: key, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    //debugger
    // WE SHOULD INCLUDE THE requirements field for this to work!!!
    for (const v of message.requirements) {
      writer.uint32(26).string(v);
    }
    return writer;
  },

  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAppData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entrypoint = reader.string();
          break;
        case 2:
          const entry2 = AppData_FilesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.files[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.requirements.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object) {
    return {
      entrypoint: isSet(object.entrypoint) ? String(object.entrypoint) : "",
      files: isObject(object.files)
        ? Object.entries(object.files).reduce((acc, [key, value]) => {
            acc[key] = File.fromJSON(value);
            return acc;
          }, {})
        : {},
      requirements: Array.isArray(object?.requirements)
        ? object.requirements.map((e) => String(e))
        : [],
    };
  },

  toJSON(message) {
    const obj = {};
    message.entrypoint !== undefined && (obj.entrypoint = message.entrypoint);
    obj.files = {};
    if (message.files) {
      Object.entries(message.files).forEach(([k, v]) => {
        obj.files[k] = File.toJSON(v);
      });
    }
    if (message.requirements) {
      obj.requirements = message.requirements.map((e) => e);
    } else {
      obj.requirements = [];
    }
    return obj;
  },

  fromPartial(object) {
    const message = createBaseAppData();
    message.entrypoint = object.entrypoint ?? "";
    message.files = Object.entries(object.files ?? {}).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = File.fromPartial(value);
        }
        return acc;
      },
      {}
    );
    message.requirements = object.requirements?.map((e) => e) || [];
    return message;
  },
};

export function createBaseAppData_FilesEntry() {
  return { key: "", value: undefined };
}

export const AppData_FilesEntry = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      File.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAppData_FilesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = File.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object) {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? File.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message) {
    const obj = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? File.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object) {
    const message = createBaseAppData_FilesEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? File.fromPartial(object.value)
        : undefined;
    return message;
  },
};

export function createBaseFile() {
  return { content: undefined };
}

export const File = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.content?.$case === "text") {
      writer.uint32(10).string(message.content.text);
    }
    if (message.content?.$case === "data") {
      writer.uint32(18).bytes(message.content.data);
    }
    return writer;
  },

  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.content = { $case: "text", text: reader.string() };
          break;
        case 2:
          message.content = { $case: "data", data: reader.bytes() };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object) {
    return {
      content: isSet(object.text)
        ? { $case: "text", text: String(object.text) }
        : isSet(object.data)
        ? { $case: "data", data: bytesFromBase64(object.data) }
        : undefined,
    };
  },

  toJSON(message) {
    const obj = {};
    if (message.content?.$case === "text") {
      obj.text = message.content.text;
    } else if (message.content?.$case === "data") {
      obj.data = base64FromBytes(message.content.data);
    }
    return obj;
  },

  fromPartial(object) {
    const message = createBaseFile();
    if (
      object.content?.$case === "text" &&
      object.content?.text !== undefined &&
      object.content?.text !== null
    ) {
      message.content = { $case: "text", text: object.content.text };
    }
    if (
      object.content?.$case === "data" &&
      object.content?.data !== undefined &&
      object.content?.data !== null
    ) {
      message.content = { $case: "data", data: object.content.data };
    }
    return message;
  },
};

function bytesFromBase64(b64) {
  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(b64, "base64"));
  } else {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return btoa(bin.join(""));
  }
}

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function isSet(value) {
  return value !== null && value !== undefined;
}
