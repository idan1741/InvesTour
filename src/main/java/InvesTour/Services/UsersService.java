package InvesTour.Services;

import InvesTour.Exceptions.SignUpException;
import InvesTour.Models.User;
import InvesTour.dal.UserRepository;
import InvesTour.utils.Json;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UserRepository repository;

    public User getUserById(Long id) {
        return Json.fromJson("", User.class);
    }

    public void signUp(User user) throws Exception {
        List<User> users = this.repository.getAllUsers();

        boolean isUserAlreadySignedUp = users.stream().anyMatch(currUser -> currUser.getEmail().equals(user.getEmail()));

        if (isUserAlreadySignedUp) {
            throw new SignUpException("already signed up");
        }

        this.repository.addUser(user);
    }

    public boolean login(String email, String password) {
        List<User> allUsers = this.repository.getAllUsers();

        return allUsers.stream()
                .anyMatch(user -> user.getEmail().equals(email) && user.getPassword().equals(password));
    }
}
