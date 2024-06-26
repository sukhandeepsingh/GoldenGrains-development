//create shop token and saving in cookies
const sendShopToken = (user,statusCode,res) => {
    const token = user.getJwtToken();

    //cookie options
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true,
    };

    res.status(statusCode).cookie("seller_token", token,options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendShopToken;