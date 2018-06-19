let axiosConfig = function() {};
axiosConfig.prototype.env = 'DEV';

axiosConfig.prototype.blacklistUrls = []; // mention url that you need to call without authorization 

axiosConfig.prototype.getFullUrl = function(uri) {
    return (process.env.API + uri);
};

axiosConfig.prototype.blackListed = function(uri) {
    let isBlackList = false;
    this.blacklistUrls.some(item => {
        if (uri.toLocaleLowerCase().indexOf(item.toLocaleLowerCase()) !== -1) {
            isBlackList = true;
            return true;
        } else {
            isBlackList = false;
            return false;
        }
    });
    return isBlackList;
}

export default (new axiosConfig());