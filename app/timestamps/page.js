import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function timestampPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data, error } = await supabase
    .from('Timestamps')
    .select()
    .eq('userID', user.id);

  if (error) {
    console.log(error.message);
  }

  console.log(data);
  return (
    <div>
      {data && data.length > 0 ? (
        data.map((data) => (
          <div key={data.id} className='timestamp-item'>
            <h2>VOD Date: {data.vodDate}</h2>
            <textarea
              className='resize rounded-md text-black w-full'
              value={data.timeStamps}
              readOnly
            />
          </div>
        ))
      ) : (
        <p>No timestamps available.</p>
      )}
    </div>
  );
}