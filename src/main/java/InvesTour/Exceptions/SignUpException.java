package InvesTour.Exceptions;

public class SignUpException extends Exception{
    public SignUpException(String msg) {
        super(msg);
        this.setStackTrace(new StackTraceElement[0]);
    }
}
