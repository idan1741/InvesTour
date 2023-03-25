package InvesTour.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;

@UtilityClass
public class Json {
    private final static ObjectMapper mapper = new ObjectMapper();

    @SneakyThrows
    public JsonNode parse(String str) {
        return mapper.readTree(str);
    }

    @SneakyThrows
    public static JsonNode toJson(Object o) {
        return mapper.valueToTree(o);
    }

    @SneakyThrows
    public static <T> T fromJson(String str, Class<T> clazz) {
        return mapper.readValue(str, clazz);
    }

    public static ObjectNode empty() {
        return mapper.createObjectNode();
    }
}
