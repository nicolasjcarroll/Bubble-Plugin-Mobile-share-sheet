function(properties, context) {
    const { Share } = context.libraries['react-native'];

    if (!Share || typeof Share.share !== "function") {
        context.reportDebugger("React Native Share module not found.");
        return { success: false, error: "Share module unavailable" };
    }

    return Share.share({
        message: properties.message
    })
    .then(result => {
        if (result.action === Share.sharedAction) {
            return {
                success: true,
                activityType: result.activityType || null
            };
        } else if (result.action === Share.dismissedAction) {
            return {
                success: false,
                dismissed: true
            };
        }
    })
    .catch(error => {
        context.reportDebugger("Share failed: " + error.message);
        return { success: false, error: error.message };
    });
}