package InvesTour.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;

import java.util.Map;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

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

    public static ObjectNode newObject() {
        return mapper.createObjectNode();
    }

    @SneakyThrows
    public static <T> T fromJson(String str, Class<T> clazz) {
        return mapper.readValue(str, clazz);
    }

    @SneakyThrows
    public static <T> Map<String, T> toTypeReference(String data) {
        return mapper.readValue(data, new TypeReference<>() {
        });
    }

    public static Stream<JsonNode> stream(final JsonNode data) {
        return StreamSupport.stream(data.spliterator(), false);
    }

    public static ObjectNode empty() {
        return mapper.createObjectNode();
    }
}
