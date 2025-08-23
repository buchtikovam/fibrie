<script lang="ts">
	import { account } from '$appwrite';

	function test() {
		account.createEmailPasswordSession();

		account.get();
	}
</script>
