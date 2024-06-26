//creating and saving a token in cookies
const sendToken = (user,statusCode,res) => {
    const token = user.getJwtToken();

    //cookie options
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true,
    };

    res.status(statusCode).cookie("token", token,options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;