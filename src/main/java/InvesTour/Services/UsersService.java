package InvesTour.Services;

import InvesTour.Exceptions.SignUpException;
import InvesTour.Models.User;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import javax.security.auth.login.FailedLoginException;
import java.io.*;

@Service
public class UsersService {

    public User getUserById(Long id) {
        return Json.fromJson("", User.class);
    }

    public void signUp(User user) throws Exception {
        JsonNode users = getAllUsers();

        for (JsonNode currUser : users.get("Users")) {
            if (currUser.has(user.getEmail())) {
                throw new SignUpException("already signed up");
            }
        }

        ObjectNode newUser = Json.empty();
        newUser.put(user.getEmail(), user.getPassword());
        ((ArrayNode)users.get("Users")).add(newUser);

        FileWriter writerObj = new FileWriter("src/main/resources/users.json", false);

        writerObj.write(users.toString());
        writerObj.close();
    }

    public boolean login(String email, String password) throws IOException {
        JsonNode users = getAllUsers();

        for (JsonNode user : users.get("Users")) {
            if (user.has(email) && user.get(email).asText().equals(password)) {
                return true;
            }
        }

        return false;
    }

    private JsonNode getAllUsers() throws IOException {
        FileInputStream usersInputStream = new FileInputStream("src/main/resources/users.json");
        String usersJson = getFileContent(usersInputStream, "UTF-8");

        return Json.parse(usersJson);
    }

    private String getFileContent(FileInputStream fis, String encoding) throws IOException {
        try (BufferedReader br =
                     new BufferedReader(new InputStreamReader(fis, encoding))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
                sb.append('\n');
            }
            return sb.toString();
        }
    }
}
